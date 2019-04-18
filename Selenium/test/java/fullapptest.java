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


public class fullapptest {

    @Test
    public void WebDriver() {

        String[] n = new String[32];
        n[0] = "Arizona Cardinals";
        n[1] = "Atlanta Falcons";
        n[2] ="Baltimore Ravens";
        n[3] ="Buffalo Bills";
        n[4] ="Carolina Panthers";
        n[5] ="Chicago Bears";
        n[6] ="Cincinnati Bengals";
        n[7] ="Cleveland Browns";
        n[8] ="Dallas Cowboys";
        n[9] ="Denver Broncos";
        n[10] ="Detroit Lions";
        n[11] ="Green Bay Packers";
        n[12] ="Houston Texans";
        n[13] ="Indianapolis Colts";
        n[14] ="Jacksonville Jaguars";
        n[15] ="Kansas City Chiefs";
        n[16] ="Miami Dolphins";
        n[17] ="Minnesota Vikings";
        n[18] ="New England Patriots";
        n[19] ="New Orleans Saints";
        n[20] ="New York Giants";
        n[21] ="New York Jets";
        n[22] ="Oakland Raiders";
        n[23] ="Philadelphia Eagles";
        n[24] ="Pittsburgh Steelers";
        n[25] ="St. Louis Rams";
        n[26] ="San Diego Chargers";
        n[27] ="San Francisco 49ers";
        n[28] ="Seattle Seahawks";
        n[29] ="Tampa Bay Buccaneers";
        n[30] ="Tennessee Titans";
        n[31] ="Washington Redskins";
        int i = 0;







        System.setProperty("webdriver.chrome.driver", "chromedriver");
        ChromeDriver driver;
        driver = new ChromeDriver();
        driver.navigate().to("localhost:3000");
        //  driver.close();
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));

        username.sendKeys("user");
        password.sendKeys("1234");
        password.submit();

        String strDateFormat = "hh:mm:ss a";

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
        }

while(i < 15) {
    WebDriverWait wait = new WebDriverWait(driver, 10);
    WebElement t = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("post")));
    t.click();
    //driver.findElementById("post").click();
    WebElement input = driver.findElementById("hsubmiti");
    Random r = new Random();
    int n1 = r.nextInt(32);
    int n2 = r.nextInt(32);

    String post = n[n1] + " " + "are way better than " + n[n2];
    input.sendKeys(post);
    WebElement tag = driver.findElementById("sport");
    tag.click();
    driver.findElementById("hsubmit").click();

    try {
        Thread.sleep(1300);
    } catch (InterruptedException e) {
    }
    i++;
}
driver.close();
    }
}
