package pl.eschenholz.api.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@Service
public class MultiThreadService {

        private static final Logger logger = LoggerFactory.getLogger(MultiThreadService.class);

        private final RestTemplate restTemplate;

        public MultiThreadService(RestTemplateBuilder restTemplateBuilder) {
            this.restTemplate = restTemplateBuilder.build();
        }

        @Async
        public CompletableFuture<String> findUser(String user) throws InterruptedException {
            logger.info("Looking up " + user);
            String url = String.format("https://api.github.com/users/%s", user);
            String results = restTemplate.getForObject(url, String.class);
            // Artificial delay of 1s for demonstration purposes
            Thread.sleep(5000L);
            logger.info("Finished looking up " + user);
            return CompletableFuture.completedFuture(results);
        }


}
