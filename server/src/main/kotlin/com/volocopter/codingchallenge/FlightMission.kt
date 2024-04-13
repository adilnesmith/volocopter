import org.bson.types.ObjectId

data class FlightMission(
    val _id: ObjectId? = null,
    val title: String,
    val description: String,
    val state: String
)
