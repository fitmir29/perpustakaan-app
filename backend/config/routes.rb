Rails.application.routes.draw do
  # Konfigurasi CORS
  match '*path', to: 'application#handle_options_request', via: :options

  # Devise route user
  devise_for :users,
    path: 'api/user',
    defaults: { format: :json },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      passwords: 'users/passwords'
    },
    path_names: {
      sign_in: 'sign_in',
      sign_out: 'sign_out',
      registration: 'register'
    }

  # Devise route admin
  devise_for :admins,
    path: 'api/admin',
    defaults: { format: :json },
    controllers: {
      sessions: 'admins/sessions',
      registrations: 'admins/registrations',
      passwords: 'admins/passwords'
    },
    path_names: {
      sign_in: 'sign_in',
      sign_out: 'sign_out',
      registration: 'register'
    }

  # API v1 routes
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
         resources :buku, only: [:index, :create, :update, :destroy]  do
         collection do
          get :search
        end
      end

      resources :peminjaman do
        member do
          post :kembalikan
        end
      end

      resources :pengembalian
    end
  end

  # health check
  get "up" => "rails/health#show", as: :rails_health_check

  # handle options method
  def handle_options_request
    head :no_content
  end
end
