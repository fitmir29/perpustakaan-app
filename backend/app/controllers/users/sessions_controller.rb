# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  # POST /users/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)

    render json: {
      message: "Login berhasil",
      user: {
        id: resource.id,
        email: resource.email
      }
    }, status: :ok
  end

  # DELETE /users/sign_out
  def destroy
    sign_out(resource_name)
    render json: { message: "Logout berhasil" }, status: :ok
  end

  private

  # Optional: jika kamu ingin log out pakai API token, tambahkan pengamanan di sini.
end