import express, {Express} from 'express';
import {metrics, ValueType} from "@opentelemetry/api";

const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();

//Create custom metric a counter for diced rolls
const o11yPrefix = 'dice-server';
const meter = metrics.getMeter(o11yPrefix, '0.1.0');
const diceCounter = meter.createCounter(`${o11yPrefix}.rolls.counter`, {
    description: 'Counts the number of dice rolls',
    unit: 'rolls',
    valueType: ValueType.INT
});

// Create a histogram to record the values of the dice rolls
const diceValuesHistogram = meter.createHistogram(`${o11yPrefix}.rolls.values`, {
    description: 'Number of diced rolls',
    valueType: ValueType.INT,
});

function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/rolldice', (req, res) => {
    diceCounter.add(1);
    const diceValue = getRandomNumber(1, 6)
    diceValuesHistogram.record(diceValue);
    res.send(diceValue.toString());
});

app.listen(PORT, () => {
    console.log(`Ready to roll the dice at http://localhost:${PORT}/rolldice`);
});
