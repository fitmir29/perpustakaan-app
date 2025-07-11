Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3000', 'http://127.0.0.1:3000'

    resource '*',
      headers: :any,
      methods: [:get, :post, :options, :put, :patch, :delete],
      credentials: true,
      expose: ['Authorization', 'Set-Cookie']
  end
end
