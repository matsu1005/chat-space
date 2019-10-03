module ControllerMacros
  def login(user)
    @request.env["devise.mapping"] = Devise.mappings
    sign_in user
  end
end