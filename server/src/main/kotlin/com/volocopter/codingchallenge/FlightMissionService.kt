import com.mongodb.client.model.Filters
import com.mongodb.client.model.Projections
import com.mongodb.client.model.Updates
import com.mongodb.kotlin.client.coroutine.MongoCollection
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.bson.types.ObjectId
class FlightMissionService(private val collection: MongoCollection<FlightMission>) {

    suspend fun getAllMissions(): List<FlightMission> {
        return try {
            collection.find().toList()
        } catch (e: Exception) {
            throw RuntimeException("Failed to fetch missions from database: ${e.localizedMessage}")
        }
    }




    suspend fun insertMission(mission: FlightMission) {
        if (mission.title.isBlank()) {
            throw IllegalArgumentException("Mission title cannot be empty")
        }
        if (!listOf("pre_flight","in_flight","post_flight").contains(mission.state)) {
            throw IllegalArgumentException("Invalid mission state. Allowed values are: pre_flight, in_flight, post_flight")
        }

        // Check if a mission with the same title already exists
        val existingMission = runBlocking {
            collection.find(Filters.eq("title", mission.title)).firstOrNull()
        }
        if (existingMission != null) {
            throw IllegalArgumentException("A mission with the same title already exists")
        }

        // If no existing mission with the same title, insert the new mission
        try {
            collection.insertOne(mission)
        } catch (e: Exception) {
            throw RuntimeException("Failed to add mission to database: ${e.localizedMessage}")
        }
    }




    suspend fun updateMissionState(id: String, newState: String) {
        try {
            val objectId = id.toObjectId()
            collection.updateOne(Filters.eq("_id", objectId), Updates.set("state", newState))
        } catch (e: IllegalArgumentException) {
            throw IllegalArgumentException("Invalid ObjectId format for mission ID")
        } catch (e: Exception) {
            throw RuntimeException("Failed to update mission state in database: ${e.localizedMessage}")
        }
    }
    suspend fun deleteMission(id: String) {
        try {
            val objectId = id.toObjectId()
            val result = collection.deleteOne(Filters.eq("_id", objectId))
            if (result.deletedCount == 0L) {
                throw IllegalArgumentException("Mission with ID $id not found")
            }
        } catch (e: IllegalArgumentException) {
            throw IllegalArgumentException("Invalid ObjectId format for mission ID")
        } catch (e: Exception) {
            throw RuntimeException("Failed to delete mission from database: ${e.localizedMessage}")
        }
    }


    private fun String.toObjectId(): ObjectId {
        return try {
            ObjectId(this)
        } catch (ex: IllegalArgumentException) {
            throw IllegalArgumentException("Invalid ObjectId format for mission ID")
        }
    }
}
