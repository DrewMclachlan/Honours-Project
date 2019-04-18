import org.junit.Test;
import org.junit.experimental.ParallelComputer;
import org.junit.runner.JUnitCore;

public class TestSuite {
    @Test
    public void test() {
        Class[] cls = {logintest.class, fullapptest.class, nfl.class};

        // Parallel among classes
        JUnitCore.runClasses(ParallelComputer.classes(), cls);



        // Parallel among methods in a class
        //JUnitCore.runClasses(ParallelComputer.methods(), cls);



        // Parallel all methods in all classes
        //JUnitCore.runClasses(new ParallelComputer(true, true), cls);
    }
}

