class UsersController < ApplicationController
  def index
    @user = User.new
  end
  
  def create
    @user = User.new user_params
    if @user.save
      return redirect_to root_path(id: @user.id), notice: "User successfully created"
    end
    redirect_to :root, notice: ( @user.save ? "User successfully created" : "Something went wrong" )
  end

  def add_employments
    if params[:user][:user_id].present?
      params_ = user_params
      @user = User.find params[:user][:user_id]
      params_[:employments_attributes].keys.each do |k|
        emp_attr = params_[:employments_attributes][k]
        @user.employments.create employer: emp_attr[:employer].to_i, start: "#{emp_attr[:'start(2i)']}/#{emp_attr[:'start(3i)']}/#{emp_attr[:'start(1i)']}", end: "#{emp_attr[:'end(2i)']}/#{emp_attr[:'end(3i)']}/#{emp_attr[:'end(1i)']}"
      end
      return redirect_to :root, notice: "Employments added."
    end
    redirect_to :root, notice: "User Missing!"
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :nickname,
      :email,
      :phone_number,
      employments_attributes: %i[id employer start(1i) start(2i) start(3i) end(1i) end(2i) end(3i) _destroy]
    )
  end
end
