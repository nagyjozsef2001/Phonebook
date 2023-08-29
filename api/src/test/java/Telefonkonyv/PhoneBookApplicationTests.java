package Telefonkonyv;

import Telefonkonyv.DataJPA.Contacts;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.web.client.TestRestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
class PhoneBookApplicationTests {

	@Autowired
	TestRestTemplate restTemplate;


	@Test
	void shouldReturnAContact(){
		int contactId = 18;

		// Make a GET request with basicauth
		ResponseEntity<Contacts> response = restTemplate.withBasicAuth("van","nincs").getForEntity(
				"http://localhost:3000/contacts/" + contactId,
				Contacts.class
		);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

		assertThat(response.getBody()).isNotNull(); //check the body
		assertThat(response.getBody().getId()).isEqualTo(contactId);
	}

	@Test
	void shouldNotReturnAContact(){
		int contactId = 1;

		ResponseEntity<Contacts> response = restTemplate.getForEntity(
				"http://localhost:3000/contacts/" + contactId,
				Contacts.class
		);

		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
	}

}
