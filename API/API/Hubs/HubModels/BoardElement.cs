namespace API.Hubs.HubModels;
public class BoardElement
{
    public Guid ElementID { get; set; }
    public ElementType Type { get; set; } = ElementType.Text;
    public string Content { get; set; }
    public string Color { get; set; }
    public Point Position { get; set; }
    public double Height { get; set; }
    public double Width { get; set; }
    public double R { get; set; }
}

public enum ElementType
{
    Text = 0,
    Line,
    Circle,
    Rectangle,
    Triangle,
}