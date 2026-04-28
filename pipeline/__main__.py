from __future__ import annotations

import argparse
import logging
import sys

from pipeline.config import settings
from pipeline.exporter import (
    enrich_with_solar,
    load_dataset,
    publish_to_docs,
    to_geojson,
    write_geojson,
)


def configure_logging(verbose: bool) -> None:
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        stream=sys.stdout,
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="pipeline",
        description="Build the Manaus heat-and-solar GeoJSON dataset.",
    )
    parser.add_argument(
        "--offline",
        action="store_true",
        help="Skip live NASA POWER calls and use cached zonal irradiance values.",
    )
    parser.add_argument("--verbose", action="store_true", help="Enable debug logging.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    configure_logging(args.verbose)
    logger = logging.getLogger("pipeline")

    logger.info("Loading raw dataset from %s", settings.raw_csv_path)
    df = load_dataset()
    logger.info("Loaded %d points across %d zones", len(df), df["zona"].nunique())

    logger.info("Enriching dataset (live NASA POWER=%s)", not args.offline)
    enriched = enrich_with_solar(df, use_live_api=not args.offline)

    logger.info("Building GeoJSON payload")
    payload = to_geojson(enriched)

    logger.info("Writing primary GeoJSON to %s", settings.output_geojson_path)
    write_geojson(payload, settings.output_geojson_path)

    logger.info("Publishing GeoJSON copy to %s", settings.public_geojson_path)
    publish_to_docs(settings.output_geojson_path, settings.public_geojson_path)

    logger.info("Done. %d features exported.", len(payload["features"]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
