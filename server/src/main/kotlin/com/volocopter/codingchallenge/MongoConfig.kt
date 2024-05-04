import com.mongodb.kotlin.client.coroutine.MongoClient
import kotlinx.coroutines.delay
import java.util.concurrent.TimeUnit

object MongoConfig {
    private const val URI = "mongodb://mongo:27017"
    private const val DATABASE_NAME = "volocopter"
    private const val COLLECTION_NAME = "flight_mission"

    val mongoClient: MongoClient by lazy { createMongoClient() }
    val database by lazy { mongoClient.getDatabase(DATABASE_NAME) }
    val collection by lazy { database.getCollection<FlightMission>(COLLECTION_NAME) }

    private fun createMongoClient(): MongoClient {
        var retries = 5
        while (true) {
            try {
                return MongoClient.create(URI)
            } catch (e: Exception) {
                if (--retries == 0) {
                    throw e
                }
                println("Failed to connect to MongoDB. Retrying in 5 seconds...")
                TimeUnit.SECONDS.sleep(5)
            }
        }
    }
}
