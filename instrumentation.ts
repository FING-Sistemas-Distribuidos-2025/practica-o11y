import dotenv from "dotenv"
import { NodeSDK } from '@opentelemetry/sdk-node';
// import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
    PeriodicExportingMetricReader,
//    ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';
 import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';

// Load environment variables from .env file
dotenv.config()

const sdk = new NodeSDK({
    // If enable we could see the traces in console
    // traceExporter: new ConsoleSpanExporter(),

    // If enable we could see the metrics in console
    // metricReader: new PeriodicExportingMetricReader({
    //     exporter: new ConsoleMetricExporter(),
    // }),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(),
    }),
    instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
