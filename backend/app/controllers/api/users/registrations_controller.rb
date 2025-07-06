# frozen_string_literal: true

class Api::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # POST /users
  def create
    build_resource(sign_up_params)

    if resource.save
      sign_up(resource_name, resource)
      render json: {
        status: { code: 201, message: 'Registrasi berhasil' },
        user: {
          id: resource.id,
          email: resource.email,
          username: resource.username,
          nama: resource.nama,
          role: resource.role
        }
      }, status: :created
    else
      render json: {
        status: { code: 422, message: 'Registrasi gagal' },
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :username,
      :nama,
      :role # jika kamu pakai kolom role ('user' atau 'admin')
    )
  end
end
