package com.moodle.backend.generator;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
public class Gen {
    public static String passwordGenerator(String password) {
        // Generate a salt
        String salt = BCrypt.gensalt();

        // Hash the password with the generated salt
        String hashedPassword = BCrypt.hashpw(password, salt);

        // Print the salt and hashed password
        // System.out.println("Salt: " + salt);
        // System.out.println("Hashed Password: " + hashedPassword);

        return hashedPassword;
    }

    public static long dateGenerator() {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date currentDate = new Date();

        try {
            // Parse the formatted date and time string into a Date object
            String formattedDate = sdf.format(currentDate);
            Date date = sdf.parse(formattedDate);
            // Convert the Date object to a Unix timestamp (divide by 1000 to convert
            // milliseconds to seconds)
            long unixTimestamp = date.getTime() / 1000;
            return unixTimestamp;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static String dateGenerator(Long timestamp) {

        // Create a Date object from the timestamp (multiply by 1000 to convert seconds
        // to milliseconds)
        Date date = new Date(timestamp * 1000);

        // Define a date format for the output
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        // Format the date as a string
        String formattedDate = sdf.format(date);

        // Print the formatted date
        System.out.println("Unix Timestamp: " + timestamp);
        System.out.println("Formatted Date: " + formattedDate);

        return formattedDate;
    }
}
