import amqp from 'amqplib';
import dotenv from 'dotenv';
import { historyRepository } from '../repositories/history.repository.js';

dotenv.config();

class HistoryService {
  constructor() {
    this.rabbitmqUrl = process.env.RABBITMQ_HOST;
    this.queueName = process.env.RABBITMQ_QUEUE;
    this.maxRetries = 10;
    this.retryDelay = 5000;
  }

  async startListening() {
    let connected = false;

    while (!connected) {
      try {
        const connection = await amqp.connect(this.rabbitmqUrl);
        const channel = await connection.createChannel();
        await channel.assertQueue(this.queueName, { durable: true });

        console.log(`Listening for messages in queue: ${this.queueName}`);

        connected = true;

        channel.consume(
          this.queueName,
          async (message) => {
            if (message !== null) {
              const event = JSON.parse(message.content.toString());
              console.log('Message received');

              try {
                await this.logAction(event);
                channel.ack(message);
              } catch (error) {
                console.error('Error processing message:', error);
              }
            }
          },
          { noAck: false }
        );
      } catch (error) {
        console.error(`Queue connection error: ${error.message}`);
        console.log('Retrying in 5 seconds...');
        await this.sleep(5000); // Ожидание перед повторной попыткой
      }
    }
  }

  async logAction(event) {
    try {
      await historyRepository.createHistoryLog({ ...event });

      console.log('Action logged:', event);
    } catch (error) {
      console.error('Error logging action:', error);
      throw error;
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const historyService = new HistoryService();
