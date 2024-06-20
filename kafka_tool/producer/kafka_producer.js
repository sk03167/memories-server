import { Kafka } from 'kafkajs';

const produce_message = (message)=>{

    const kafka = new Kafka({
      clientId: 'my-producer',
      brokers: ['65.2.149.187:9092'], // Replace with your Kafka broker address
    });
    
    const producer = kafka.producer();
    
    const currentTimestamp = new Date();

// Display the timestamp in a human-readable format
// console.log(currentTimestamp);

// You can also convert the timestamp to a string in a specific format
const formattedTimestamp = currentTimestamp.toISOString();
console.log(formattedTimestamp);

    const produceMessage = async () => {
      await producer.connect();
      const topic = 'memories_topic'; // Replace with your Kafka topic name
    
      await producer.send({
        topic,
        messages: [
          {
            value: JSON.stringify({
            "postcount": message,
            "owner_name":"Shivansh Kumar"
          })
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