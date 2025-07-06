class Api::Admins::PasswordsController < Devise::PasswordsController
  respond_to :json

  # POST /admins/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)

    if successfully_sent?(resource)
      render json: { message: "Email reset password telah dikirim." }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /admins/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      render json: { message: "Password berhasil direset." }, status: :ok
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def resource_params
    params.require(:admin).permit(:email, :password, :password_confirmation, :reset_password_token)
  end
end