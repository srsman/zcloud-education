package com.education.experiment.cloudlibrary;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

import com.education.experiment.commons.Constants;
import com.education.experiment.commons.HadoopConfiguration;
import com.education.experiment.commons.UserBean;
import com.education.experiment.util.FileUtil;

public class DetailBookServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static final Configuration conf = HadoopConfiguration.getConfiguration();

	/**
	 * 处理用户提交的下载天气示例文件的请求，用户提交请求后，服务端会从指定的目录下下载天气示例文件.
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 找到用户所选定的文件
		request.setCharacterEncoding("utf-8");
		UserBean ub = (UserBean) request.getSession().getAttribute("user");
		if (ub == null) {
			request.getRequestDispatcher("/login.jsp").forward(request, response);
		} else {
			// 获取用户提交的文件名称
			String uuidname = new String(request.getParameter("filename").getBytes("ISO-8859-1"), "UTF-8");
			System.out.println("uuidname:" + uuidname);
			File f = new File(Constants.LOCAL_BOOK_PATH + File.separator + uuidname);
			if (!f.exists()) {
				String dst = Constants.HDFS_BOOK_UPLOADDATA + uuidname;
				FileSystem fs = FileSystem.get(conf);
				InputStream hadopin = null;
				OutputStream bos = new BufferedOutputStream(new FileOutputStream(f));
				Path hdfsPath = new Path(dst);
				try {
					if (!fs.exists(hdfsPath)) {
						request.getRequestDispatcher("/error.jsp?result=访问资源不存在!").forward(request, response);
					} else {
						hadopin = fs.open(hdfsPath);
						IOUtils.copyBytes(hadopin, bos, 4096, true);
					}
				} finally {
					if(hadopin != null) IOUtils.closeStream(hadopin);
					if(bos != null) bos.close();
					if(f.length() == 0){
						f.delete();
						return;
					}
				}
			} 
			// 下载文件结束
			// 开始往客户端传送示例文件
			// 创建一 个输入流对象和指定的文件相关联
			FileInputStream input = new FileInputStream(f);
			String content = FileUtil.readInputStream(input);
			request.setAttribute("content", content);
			request.getRequestDispatcher("/detailbook.jsp").forward(request, response);
		}
	}
	
	public static void main(String[] args) {
		try {
			FileSystem fs = FileSystem.get(conf);
			Path hdfsPath = new Path("/tomcat/experiment/librarycloud/uploaddata/hello.txt");
			if (!fs.exists(hdfsPath)) {
				System.out.println("no exist!");
			}else{
				System.out.println("exist!");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
