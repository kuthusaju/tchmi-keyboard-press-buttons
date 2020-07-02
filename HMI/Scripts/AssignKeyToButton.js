// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var AssignKeyToButton = function (Button, Key) {

        var buttonId = Button.getId();
        var triggeredKeyDown = false;
        var triggeredKeyPress = false;

        $(document).on("keydown." + buttonId, function (event) {
            var key = event.key;
            if (key == Key) {
                if (!triggeredKeyDown) {
                    triggeredKeyDown = true;
                    TcHmi.EventProvider.raise(buttonId + '.onMouseDown');
                    $("#" + buttonId).addClass("down");
                }
            }        
        });

        $(document).on("keyup." + buttonId, function (event) {
            var key = event.key;
            if (key == Key) {
                triggeredKeyDown = false;
                triggeredKeyPress = false;
                TcHmi.EventProvider.raise(buttonId + '.onMouseUp');
                $("#" + buttonId).removeClass("down");
            }
        });

        $(document).on("keypress." + buttonId, function (event) {
            var key = event.key;
            if (key == Key) {
                if (!triggeredKeyPress) {
                    triggeredKeyPress = true;
                    TcHmi.EventProvider.raise(buttonId + '.onPressed');
                }
            }
        });

        var destroyDetachedEvent = TcHmi.EventProvider.register(buttonId + '.onDetached', function (evt, data) {

                // unregister the events when the control is detached.
                $(document).off("keydown." + buttonId);
                $(document).off("keyup." + buttonId);
                $(document).off("keypress." + buttonId);

                // destroy the onDeteached call back function
                destroyDetachedEvent();
            }
        );

    };
    
    TcHmi.Functions.registerFunction('AssignKeyToButton', AssignKeyToButton);
})(TcHmi);