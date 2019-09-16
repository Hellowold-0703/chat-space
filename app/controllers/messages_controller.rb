class MessagesController < ApplicationController
  def index
    @message = Message.new
    Message.all
  end 

  def create
    Message.create(message_params)
  end

  private

  def message_params
    params.require(:message).permit(:body, :image)
  end
end

