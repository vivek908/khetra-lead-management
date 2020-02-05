import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class LMS extends HttpServlet {
	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;
	
	public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
   
		String n = request.getParameter("name");
		String p = request.getParameter("mobile");
		String e = request.getParameter("currentPos");
		String c = request.getParameter("pin");

		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/khetra_db", "rohit", "Rohit_@1234");
			PreparedStatement ps = con.prepareStatement("insert into LMS(name,mobile_no,lead_type,pin_code) values(?,?,?,?)");
    
			ps.setString(1, n);
			ps.setString(2, p);
			ps.setString(3, e);
			ps.setString(4, c);
            
			int i = ps.executeUpdate();
			if (i > 0)
				out.print("<html><style>body{background-color:#123456;}</style><h1 style='color:green'>You are successfully registered...</h1></html>");

		} catch (Exception e2) {
			out.println(e2);
		}

		out.close();
	}
	

}