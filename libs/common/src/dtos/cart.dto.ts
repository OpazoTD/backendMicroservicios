import { IsInt, IsPositive, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
}

export class RemoveFromCartDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  productId: number;
}
