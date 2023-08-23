package Telefonkonyv.DataJPA;

import jakarta.persistence.*;

@Entity
@Table(name="ADDRESS")
public class Address {
    @Id
    @SequenceGenerator(
            name = "address_id_sequence",
            sequenceName = "address_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "address_id_sequence"
    )
    private Integer id;
    private String country;
    private String postalCode;
    private String shire;
    private String city;
    private String street;
    private String number;
    private String stairs;
    private String floor;
    private String apartment;

    public Address(Integer id, String country, String postalCode, String shire, String city, String street, String number, String stairs, String floor, String apartment) {
        this.id = id;
        this.country = country;
        this.postalCode = postalCode;
        this.shire = shire;
        this.city = city;
        this.street = street;
        this.number = number;
        this.stairs = stairs;
        this.floor = floor;
        this.apartment = apartment;
    }

    public Address() {
    }

    public Address(Integer id, String country, String postalCode, String shire, String city, String street, String number) {
        this.id = id;
        this.country = country;
        this.postalCode = postalCode;
        this.shire = shire;
        this.city = city;
        this.street = street;
        this.number = number;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", country='" + country + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", shire='" + shire + '\'' +
                ", city='" + city + '\'' +
                ", street='" + street + '\'' +
                ", number='" + number + '\'' +
                ", stairs='" + stairs + '\'' +
                ", floor='" + floor + '\'' +
                ", apartment='" + apartment + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getShire() {
        return shire;
    }

    public void setShire(String shire) {
        this.shire = shire;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getStairs() {
        return stairs;
    }

    public void setStairs(String stairs) {
        this.stairs = stairs;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getApartment() {
        return apartment;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }
}
