package com.volocopter.codingchallenge

import FlightMissionService
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.fasterxml.jackson.databind.*
import flightMissionRoute
import io.ktor.jackson.*
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
class CodingChallengeApplication

fun main() {
    embeddedServer(Netty, port = 8000, host = "0.0.0.0") {
        install(ContentNegotiation) {
            jackson {
                enable(SerializationFeature.INDENT_OUTPUT)
            }
        }
        install(StatusPages) {
            exception<Throwable> { cause ->
                call.respond(HttpStatusCode.InternalServerError, cause.localizedMessage)
            }
        }
        install(CallLogging)

        val flightMissionService = FlightMissionService(MongoConfig.collection)

        routing {
            flightMissionRoute(flightMissionService)
        }
    }.start(wait = true)

}

