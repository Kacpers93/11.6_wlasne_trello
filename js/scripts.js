$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    function Column(name) {
        var self = this; // useful for nested functions

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            
            var $column2 = $('<div>').addClass('column2');

            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            
            
            $columnDelete.click(function() {
                self.removeColumn();
            });
            //Add a note after clicking on the button:
            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });
            
            $column.append($column2.append($columnTitle)
                           .append($columnDelete)
                           .append($columnAddCard)
                           .append($columnCardList));
            
            return $column;
            
        }
    }
    
    Column.prototype = {
        addCard: function (card) {
            this.$element.find('ul').append(card.$element);
        },
        removeColumn: function () {
            this.$element.remove();
        }
    };
    
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            $card.append($cardDelete)
                .append($cardDescription);
            return $card;
            
        }
    }
    
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }
    
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    $('.create-column')
        .click(function(){
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });
    
    // CREATING COLUMNS
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');
    var extraTask = new Column('Extra Task');
    var bin = new Column('Trash');

    // ADDING COLUMNS TO THE BOARD
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    board.addColumn(extraTask);
    board.addColumn(bin);

    // CREATING CARDS
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');
    var card3 = new Card('Something');
    var card4 = new Card('Lorem ipsum');
    var card5 = new Card('Lorem ipsum');

    // ADDING CARDS TO COLUMNS
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doingColumn.addCard(card3);
    extraTask.addCard(card4);
    extraTask.addCard(card5);
})

