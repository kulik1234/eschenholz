package pl.eschenholz.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.*;
import java.nio.Buffer;
import java.util.ArrayList;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
	private static void preapreEndpoints(){
		ArrayList<String> list = new ArrayList<>();
		try {
			FileReader filer = new FileReader("C:\\Users\\Bogdan\\React\\eschenholz\\api\\src\\main\\resources\\application.properties");
			BufferedReader reader = new BufferedReader(filer);
			reader.lines().forEach(line -> {
				list.add(line);
						System.out.println(line);
					}
			);
			System.out.println("To jest koniec odzczytu czas na zapis");
			filer.close();
			reader.close();
			FileWriter filew = new FileWriter("C:\\Users\\Bogdan\\React\\eschenholz\\api\\src\\main\\resources\\application.properties");
			BufferedWriter writer = new BufferedWriter(filew);
			list.add("api.endpoint=contact-form");
			list.stream().forEach(line->{
				System.out.println(line);
				char[] a = line.toCharArray();
				for(char ch : a) {
					try {
						writer.append(ch);
						writer.flush();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				try {
					writer.newLine();
				} catch (IOException e) {
					e.printStackTrace();
				}
			});
			filew.close();
			writer.close();
		}
		catch (IOException e){
			System.out.println(e);
		}
	}


}
