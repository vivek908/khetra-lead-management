import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JDBCUtil {

	private static String jdbcDriver="com.mysql.jdbc.Driver";
	
	private static String jdbcUrl="jdbc:mysql://localhost:3306/sonoo";
	private static String username="root";
	private static String password="vivek";
	
	public static Connection getConnection() {
		
		Connection con=null;
		try {
			
			Class.forName(jdbcDriver);
			con=DriverManager.getConnection(jdbcUrl.trim(),username.trim(),password.trim());
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return con;
	}
	
	public static void main(String[] args) {
		
		Connection conn = JDBCUtil.getConnection();
		try{

			String query = "SELECT * FROM LMS";
			Statement st = conn.createStatement();
			ResultSet rs = st.executeQuery(query);
			System.out.println("Success");
		}catch(Exception e){
			e.printStackTrace();
		}
	}
}
