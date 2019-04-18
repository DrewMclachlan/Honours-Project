import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;


public class nfl {
    @Test
    public void WebDriver() {

        String[] n = new String[7];
        n[0] = "Cardinals vs Ravens started";
        n[1] = "34 yard pass Ravens, 1st down.";
        n[2] = "Patrick Ricard breaks away in a 26 yard run. 1st down, with Ravens on the Cards 80 yard line";
        n[3] = "Ravens 4th and 3";
        n[4] = "They've decided to go for the play";
        n[5] = "Touchdown Ravens!";
        n[6] = "7R - 0C";


        System.setProperty("webdriver.chrome.driver", "chromedriver");
        ChromeDriver driver;
        driver = new ChromeDriver();
        driver.navigate().to("localhost:3000");
        //  driver.close();
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));

        username.sendKeys("NFL");
        password.sendKeys("1234");
        password.submit();
        String strDateFormat = "hh:mm:ss:SSS";
        System.out.println("NFL score updates leaving Selenium");




        for(String s : n){{
            WebDriverWait wait = new WebDriverWait(driver, 10);
            WebElement t = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("post")));
            t.click();
            //driver.findElementById("post").click();
            WebElement input = driver.findElementById("hsubmiti");
            input.sendKeys(s);
            WebElement tag = driver.findElementById("sport");
            tag.click();
            Date date = new Date();
            DateFormat dateFormat = new SimpleDateFormat(strDateFormat);
            String formattedDate = dateFormat.format(date);
            System.out.println(formattedDate);
            driver.findElementById("hsubmit").click();
            //time
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
            }
        }

        }
        driver.close();
    }



}
