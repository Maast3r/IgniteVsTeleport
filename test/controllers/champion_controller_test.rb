require 'test_helper'

class ChampionControllerTest < ActionController::TestCase
  test "should get overall" do
    get :overall
    assert_response :success
  end

end
