class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました。'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
  end

  private
   def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
   end

  def set_group
    @group = Group.find(params[:group_id])
  end
end


# Started POST "/groups/1/messages" for ::1 at 2019-09-28 13:38:01 +0900
# Processing by MessagesController#create as HTML
#   Parameters: {"utf8"=>"✓", "authenticity_token"=>"UOcpI77wilPWNBTvaPuuZWD6clybCkXtHBb2LNAiw8oWkQxHiWgrocqK2Vtc/TMppSyfAgEK7Ywq8WhDN/bDtA==", "message"=>{"text"=>"ddd", "image"=>#<ActionDispatch::Http::UploadedFile:0x00007f85baf91c48 @tempfile=#<Tempfile:/var/folders/g5/n9z2rs2x2l74rb03wngh8qw40000gn/T/RackMultipart20190928-91744-am4gar.jpg>, @original_filename="78a67_88_ca17d324867c8b09cd3a4f9164ea220a-cm.jpg", @content_type="image/jpeg", @headers="Content-Disposition: form-data; name=\"message[image]\"; filename=\"78a67_88_ca17d324867c8b09cd3a4f9164ea220a-cm.jpg\"\r\nContent-Type: image/jpeg\r\n">}, "commit"=>"Send", "group_id"=>"1"}
#   User Load (0.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 2 ORDER BY `users`.`id` ASC LIMIT 1
#    (0.2ms)  BEGIN
#   User Load (0.2ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 2 LIMIT 1
#   Group Load (0.2ms)  SELECT  `groups`.* FROM `groups` WHERE `groups`.`id` = 1 LIMIT 1
#   SQL (0.2ms)  INSERT INTO `messages` (`text`, `image`, `user_id`, `group_id`, `created_at`, `updated_at`) VALUES ('ddd', '78a67_88_ca17d324867c8b09cd3a4f9164ea220a-cm.jpg', 2, 1, '2019-09-28 04:38:01', '2019-09-28 04:38:01')
#    (0.5ms)  COMMIT