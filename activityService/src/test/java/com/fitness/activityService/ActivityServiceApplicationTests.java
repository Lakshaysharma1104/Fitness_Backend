package com.fitness.activityService;

import jakarta.annotation.PostConstruct;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;

@SpringBootTest
class ActivityServiceApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private Environment environment;

	@Test
	void testTopicName() {
		System.out.println(environment.getProperty("kafka.topic.name"));
	}

}
