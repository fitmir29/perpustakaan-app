# frozen_string_literal: true

class Api::Admin::SessionsController < Devise::SessionsController
  respond_to :json

  # POST /admins/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)

    if resource
      sign_in(resource_name, resource)
      render json: {
        status: { code: 200, message: 'Login berhasil' },
        admin: {
          id: resource.id,
          email: resource.email,
          role: 'admin'
        }
      }, status: :ok
    else
      render json: {
        status: { code: 401, message: 'admin atau password salah' }
      }, status: :unauthorized
    end
  end

  # DELETE /admins/sign_out
  def destroy
    if current_admin
      sign_out(resource_name)
      render json: {
        status: { code: 200, message: 'Logout berhasil' }
      }, status: :ok
    else
      render json: {
        status: { code: 401, message: 'Belum login atau session sudah habis' }
      }, status: :unauthorized
    end
  end
end
