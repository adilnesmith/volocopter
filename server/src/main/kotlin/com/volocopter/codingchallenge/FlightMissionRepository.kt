import com.mongodb.client.model.Filters
import com.mongodb.client.model.Updates
import kotlinx.coroutines.flow.toList
import org.bson.types.ObjectId

class FlightMissionRepository {
    val collection = MongoConfig.database.getCollection<FlightMission>("flight_missions")

    suspend fun getAllMissions(): List<FlightMission> {
        return try {
            collection.find().toList()
        } catch (e: Exception) {
            throw RuntimeException("Failed to fetch missions from database: ${e.localizedMessage}")
        }
    }

    suspend fun addMission(mission: FlightMission) {
        try {
            collection.insertOne(mission)
        } catch (e: Exception) {
            throw RuntimeException("Failed to add mission to database: ${e.localizedMessage}")
        }
    }

    suspend fun updateMissionState(id: ObjectId, newState: String) {
        try {
            collection.updateOne(Filters.eq("_id", id), Updates.set("state", newState))
        } catch (e: Exception) {
            throw RuntimeException("Failed to update mission state in database: ${e.localizedMessage}")
        }
    }

    suspend fun deleteMission(id: ObjectId) {
        try {
            collection.deleteOne(Filters.eq("_id", id))
        } catch (e: Exception) {
            throw RuntimeException("Failed to delete mission from database: ${e.localizedMessage}")
        }
    }
}
