# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # POST /users (register user baru)
  def create
    build_resource(sign_up_params)

    if resource.save
      sign_up(resource_name, resource)
      render json: {
        message: "Registrasi berhasil",
        user: resource
      }, status: :created
    else
      render json: {
        message: "Registrasi gagal",
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    # Tambahkan atribut lain jika dibutuhkan, misalnya :nama
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end