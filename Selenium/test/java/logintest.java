import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LogEntry;
import org.openqa.selenium.logging.LogType;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.logging.Level;

public class logintest {
    @Test
    public void WebDriver(){

        String book = " On my honor as a Tully she told Lord Walder on my honor as a Stark, I will trade your boy’s life for Robb’s. A son for a son. Her hand shook so badly she was ringing Jinglebell’s head. Boom, the drum sounded, boom doom boom doom. The old man’s lips went in and out. The knife trembled in Catelyn’s hand, slippery with sweat. " +
                "A son for a son, heh, he repeated. But that’s a grandson . . . and he never was much use.\n" +
                "\n" +
                "A man in dark armor and a pale pink cloak spotted with blood stepped up to Robb. Jaime Lannister sends his regards. He thrust his longsword through her son’s heart, and twisted.";
        String [] words = book.split(" ");
        int i = 0;


        System.setProperty("webdriver.chrome.driver", "chromedriver");
        ChromeDriver driver;





        driver = new ChromeDriver();

        driver.navigate().to("localhost:3000");
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));


        username.sendKeys("drew");
        password.sendKeys("1234");
        password.submit();



//change this back to ten
        //or 15
            while(i < 20) {
                WebDriverWait wait = new WebDriverWait(driver, 10);
                WebElement t = wait.until(ExpectedConditions.elementToBeClickable(By.id("post")));
                t.click();
                //driver.findElementById("post").click();
                WebElement input = driver.findElementById("hsubmiti");
                Random r = new Random();
                int n1 = r.nextInt(100);
                int n2 = r.nextInt(100);
                int n3 = r.nextInt(100);

                String post = words[n1] + " " + words[n2] + " " + words[n3];
                input.sendKeys(post);
                driver.findElementById("hsubmit").click();
                //time

                //change that back to 300
                 try {
                       Thread.sleep(1000);
                 } catch (InterruptedException e) {
                   }
                   i++;

            }
        driver.close();

    }
}
