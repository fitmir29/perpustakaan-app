# frozen_string_literal: true

class Api::Admins::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # POST /admins (register admin baru)
  def create
    build_resource(sign_up_params)

    if resource.save
      sign_up(resource_name, resource)
      render json: {
        message: "Registrasi admin berhasil",
        admin: {
          id: resource.id,
          email: resource.email,
          username: resource.username,
          nama: resource.nama,
          role: resource.role
        }
      }, status: :created
    else
      render json: {
        message: "Registrasi admin gagal",
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    # Tambahkan atribut tambahan sesuai model
    params.require(:admin).permit(:email, :password, :password_confirmation, :username, :nama, :role)
  end
end
