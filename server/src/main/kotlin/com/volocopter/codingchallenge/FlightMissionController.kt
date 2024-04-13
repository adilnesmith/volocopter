import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import java.util.*

fun Route.flightMissionRoute(service: FlightMissionService) {
    route("/missions") {
        // CORS preflight request handling
        options {
            call.respond(HttpStatusCode.OK)
        }

        // CORS headers for all routes in the "/missions" route
        intercept(ApplicationCallPipeline.Features) {
            call.response.headers.append("Access-Control-Allow-Origin", "*")
            call.response.headers.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            call.response.headers.append("Access-Control-Allow-Headers", "Authorization, Content-Type")
            call.response.headers.append("Access-Control-Max-Age", "3600")
        }
        get {
            try {
                val missions = service.getAllMissions()
                call.respond(HttpStatusCode.OK, missions)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, e.localizedMessage)
            }
        }
        get("/state={state}") {
            val state = call.parameters["state"]
            if (state.isNullOrBlank()) {
                call.respond(HttpStatusCode.BadRequest, "State parameter is missing")
            } else {
                try {
                    val missions = service.getMissionsByState(state)
                    call.respond(HttpStatusCode.OK, missions)
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.InternalServerError, e.localizedMessage)
                }
            }
        }
        post {
            try {
                val mission = call.receiveOrNull<FlightMission>() ?: throw IllegalArgumentException("Mission data is missing or malformed")
                service.insertMission(mission)
                call.respond(HttpStatusCode.Created)
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, e.localizedMessage)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, e.localizedMessage)
            }
        }
        put {
            try {
                val id = call.parameters["id"] ?: throw IllegalArgumentException("Mission ID is missing")
                val newState = call.request.queryParameters["state"] ?: throw IllegalArgumentException("New state query parameter is missing or malformed")
                if (newState.isBlank()) {
                    throw IllegalArgumentException("State cannot be empty")
                }
                service.updateMissionState(id, newState)
                call.respond(HttpStatusCode.OK)
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, e.localizedMessage)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, e.localizedMessage)
            }
        }
        delete {
            try {
                val id = call.parameters["id"] ?: throw IllegalArgumentException("Mission ID is missing")
                service.deleteMission(id)
                call.respond(HttpStatusCode.OK)
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, e.localizedMessage)
            } catch (e: Exception) {
                call.respond(HttpStatusCode.InternalServerError, e.localizedMessage)
            }
        }

    }
}
