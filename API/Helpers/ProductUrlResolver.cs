using API.DTO;
using AutoMapper;
using AutoMapper.Execution;
using Core.Entities;

namespace API.Helpers;

public class ProductUrlResolver:IValueResolver<Product,ProductToReturnDto,string>
{
    public IConfiguration _config { get; }

    public ProductUrlResolver(IConfiguration config)
    {
        _config = config;
    }

    public string Resolve(Product source,ProductToReturnDto destination,string desMember,
        ResolutionContext context)
    {
        if (!string.IsNullOrEmpty(source.PictureUrl))
        {
            return _config["ApiUrl"]+source.PictureUrl;
        }

        return null;
    }
}