let emailTemp = async (name) => {
  try {
   

    let forgotTemplate = `
  
		<div class="wrapper">
			<div class="content py-0">
				<!-- acchievement-wrap -->
				<div class="email-template-wrap">
					<div style="padding-left: 6%">
						<div class="email-template-content">
							<div class="vector-image-wrap" style="width: 100%">
								<div class="email-image">
									<figure class="image-wrap" style="text-align: right">
										<img
											style="display: inline-block; height: 60px"
											src="https://shevolve.s3.ap-south-1.amazonaws.com/email-vector-img.jpg"
										/>
									</figure>
								</div>
							</div>
							<div style="display: flex">
								<div style="width: 50%">
									<div class="email-text-content">
										<h4 style="color: #007a87; margin-bottom: 30px">
											Dear ,
										</h4>
										<h6 style="margin-bottom: 30px">
											Greetings from team Shevolve!
										</h6>

										<span style="display: block; margin-bottom: 10px"
											>Thank you for choosing Shevolve to further
											your career.</span
										>

										<span style="display: block; margin-bottom: 20px">
											The book “32 ways” by Shevolve aims at ensuring
											women succeed in their careers with confidence
											and ease. This book will help you to view your
											situation differently and start off on the
											right track to a successful career.
										</span>

										<span style="display: block; margin-bottom: 5px">
											Please download your ebook attached to this
											email.
										</span>

										<span style="display: block; margin-bottom: 10px">
											We at Shevolve believe that you have what it
											takes to a fulfilling career.
										</span>
										<span style="display: block; margin-bottom: 5px"
											>We appreciate your feedback anytime.</span
										>

										<span style="display: block; margin-bottom: 30px">
											Feel free to contact us for any further
											information.
										</span>
										<div>
											<span
												style="
													display: block;
													margin-bottom: 5px;
													color: #000;
												"
												>Warm Regards,</span
											>
											<span
												style="
													display: block;
													margin-bottom: 5px;
													color: #000;
												"
												>Team Shevolve
											</span>
											<span
												style="
													display: block;
													margin-bottom: 5px;
													color: #000;
												"
												>Email: reachus@shevolve.in</span
											>
											<span
												style="
													display: block;
													margin-bottom: 5px;
													color: #000;
												"
												>You can also reach us on: Social media and
												website links</span
											>
											<span
												style="
													display: block;
													margin-bottom: 5px;
													color: #000;
												"
												>Privacy policy</span
											>
										</div>
									</div>
								</div>
								<div style="width: 50%">
									<div class="email-image">
										<figure
											class="image-wrap"
											style="margin-bottom: 0px"
										>
											<img
												style="width: 100%"
												src="https://shevolve.s3.ap-south-1.amazonaws.com/email-img.jpg"
											/>
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	
    `;
    // console.log("hhhhhhhhhhhhhhhh     ",forgotTemplate);
    return forgotTemplate;
  } catch (err) {
    console.log(err);
  }
};

module.exports = emailTemp;
