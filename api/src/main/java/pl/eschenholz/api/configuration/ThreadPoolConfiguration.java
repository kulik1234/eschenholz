package pl.eschenholz.api.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;


@Configuration
public class ThreadPoolConfiguration {


    @Value("4")
    int corePoolSize;

    @Value("8")
    int maxPoolSize;

    @Value("eschenholz_api_")
    String ThreadNamePrefix;

    @Bean
    public ThreadPoolTaskExecutor  taskExecutor() {
        ThreadPoolTaskExecutor pool = new ThreadPoolTaskExecutor();
        pool.setCorePoolSize(corePoolSize);
        pool.setMaxPoolSize(maxPoolSize);
        pool.setThreadNamePrefix(ThreadNamePrefix);
        pool.initialize();
        return pool;
    }
}
