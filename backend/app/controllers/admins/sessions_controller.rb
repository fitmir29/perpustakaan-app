class Admins::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)

    render json: {
      message: "Login berhasil sebagai admin",
      admin: resource,
      token: request.env['warden-jwt_auth.token'] # Jika pakai JWT
    }, status: :ok
  end

  def destroy
    sign_out(resource_name)
    render json: { message: "Logout berhasil" }, status: :ok
  end
end