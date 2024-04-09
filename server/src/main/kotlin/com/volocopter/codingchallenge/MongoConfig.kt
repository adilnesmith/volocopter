import com.mongodb.kotlin.client.coroutine.MongoClient

object MongoConfig {
    private const val URI = "mongodb://localhost:27017"
    private const val DATABASE_NAME = "volocopter"
    private const val COLLECTION_NAME = "flight_mission"

    val mongoClient: MongoClient by lazy { MongoClient.create(URI) }
    val database by lazy { mongoClient.getDatabase(DATABASE_NAME) }
    val collection by lazy { database.getCollection<FlightMission>(COLLECTION_NAME) }
}