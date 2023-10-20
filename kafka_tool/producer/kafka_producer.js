import { Kafka } from 'kafkajs';

const produce_message = (message)=>{

    const kafka = new Kafka({
      clientId: 'my-producer',
      brokers: ['13.233.196.39:9092'], // Replace with your Kafka broker address
    });
    
    const producer = kafka.producer();
    
    const produceMessage = async () => {
      await producer.connect();
      const topic = 'memories_topic'; // Replace with your Kafka topic name
    
      await producer.send({
        topic,
        messages: [
          {
            value: message,
          },
        ],
      });
    
      await producer.disconnect();
    };
    
    produceMessage().catch((error) => {
      console.error('Error producing message:', error);
    });
    
}
export default produce_message;