import org.bson.types.ObjectId

data class FlightMission(
    val _id: ObjectId,
    val title: String,
    val description: String,
    val state: String
)
