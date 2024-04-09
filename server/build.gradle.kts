import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {

	id("org.springframework.boot") version "3.2.0"
	id("io.spring.dependency-management") version "1.1.4"
	kotlin("jvm") version "1.9.20"
	kotlin("plugin.spring") version "1.9.20"
}

group = "com.volocopter"
version = "1.0.0"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.mongodb:mongodb-driver-kotlin-coroutine:5.0.0")
	implementation("org.mongodb:bson-kotlinx:5.0.0")
	implementation("io.ktor:ktor-server-core:1.6.4")
	implementation("io.ktor:ktor-server-netty:1.6.4")
	implementation("org.mongodb:mongodb-driver-kotlin-coroutine:5.0.0")
	implementation("org.mongodb:bson-kotlinx:5.0.0")
	implementation("io.ktor:ktor-server-core:1.6.4")
	implementation("io.ktor:ktor-server-netty:1.6.4")
	implementation("io.ktor:ktor-jackson:1.6.0")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
