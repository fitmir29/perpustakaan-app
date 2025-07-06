# frozen_string_literal: true

class Api::Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  # Callback Devise setelah login sukses
  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: 'Login berhasil' },
      user: {
        id: resource.id,
        email: resource.email,
        username: resource.username,
        nama: resource.nama,
        role: resource.role
      }
    }, status: :ok
  end

  # Callback Devise setelah logout
  def respond_to_on_destroy
    if current_user
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
