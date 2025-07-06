class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  before_action :set_cors_headers
  skip_before_action :verify_authenticity_token # Untuk API

  private

  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'
    headers['Access-Control-Allow-Credentials'] = 'true'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization'
  end
end