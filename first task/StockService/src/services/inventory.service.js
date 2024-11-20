import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

class InventoryService {
  constructor() {
    this.rabbitmqUrl = process.env.RABBITMQ_HOST;
    this.queueName = process.env.RABBITMQ_QUEUE;
  }

  async publishToQueue(message) {
    try {
      const connection = await amqp.connect(this.rabbitmqUrl);
      const channel = await connection.createChannel();
      await channel.assertQueue(this.queueName, { durable: true });

      channel.sendToQueue(
        this.queueName,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true,
        }
      );

      console.log('Message delivered:', message);
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Queue error:', error);
    }
  }

  async processAction(action, data) {
    console.log(`${action} COMPLETED`);

    await this.publishToQueue({
      ...data,
      action,
      date: new Date(),
    });
  }
}

export const inventoryService = new InventoryService();
