Feature: Plaver vs Computer
  As a player 
  I want to play against computer
  So I can have fun 

  Scenario Outline: Select player vs computer from menu
    Given I go to the "selection" page
    When computer chooses "<computer_choice>"
    And I choose "<human_choice>"
    Then I should be redirected "show" page
    And see "<human_choice>" picture and "<computer_choice>" picture
    And I wait "1" seconds
    Then I see "<result>" as result <human_choice> vs <computer_choice>
    Examples:
      | human_choice | computer_choice | result  |  
      | rock         | rock            | DRAW    |
      | paper        | rock            | YOU WIN |
      | scissors     | rock            | YOU LOSE |   
    Examples:
      | human_choice | computer_choice | result   |  
      | rock         | paper           | YOU LOSE |
      | paper        | paper           | DRAW     |
      | scissors     | paper           | YOU WIN  |   
    Examples:
      | human_choice | computer_choice | result   |  
      | rock         | scissors        | YOU WIN  |
      | paper        | scissors        | YOU LOSE |
      | scissors     | scissors        | DRAW     |   

